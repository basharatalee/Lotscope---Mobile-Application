import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';

type NotesByLot = Record<number, string>;

const notesFilePath = `${RNFS.DocumentDirectoryPath}/lotscope-lot-notes.json`;
const notesByLot: NotesByLot = {};
const listeners = new Set<() => void>();
let hasLoaded = false;
let loadPromise: Promise<void> | null = null;

function notifyListeners() {
  listeners.forEach(listener => listener());
}

async function loadNotes() {
  if (hasLoaded) {
    return;
  }

  if (!loadPromise) {
    loadPromise = RNFS.exists(notesFilePath)
      .then(exists => {
        if (!exists) {
          return null;
        }

        return RNFS.readFile(notesFilePath, 'utf8');
      })
      .then(contents => {
        if (!contents) {
          return;
        }

        const parsed = JSON.parse(contents) as Record<string, unknown>;
        Object.entries(parsed).forEach(([lotNumber, note]) => {
          const numericLot = Number(lotNumber);

          if (Number.isFinite(numericLot) && typeof note === 'string') {
            notesByLot[numericLot] = note;
          }
        });
      })
      .catch(() => {
        // Notes are a convenience feature; a corrupt/missing local file should
        // never block catalogue browsing.
      })
      .finally(() => {
        hasLoaded = true;
        notifyListeners();
      });
  }

  await loadPromise;
}

function persistNotes() {
  RNFS.writeFile(notesFilePath, JSON.stringify(notesByLot), 'utf8').catch(() => {
    // Keep the in-memory note even if the device rejects the write.
  });
}

export function getLotNote(lotNumber: number) {
  return notesByLot[lotNumber] ?? '';
}

export function setLotNote(lotNumber: number, note: string) {
  const trimmedNote = note.trim();

  if (trimmedNote) {
    notesByLot[lotNumber] = note;
  } else {
    delete notesByLot[lotNumber];
  }

  notifyListeners();
  persistNotes();
}

export function subscribeToLotNotes(listener: () => void) {
  listeners.add(listener);
  void loadNotes();

  return () => {
    listeners.delete(listener);
  };
}

export function useLotNote(lotNumber: number) {
  const [note, setNoteState] = useState(() => getLotNote(lotNumber));

  useEffect(() => {
    setNoteState(getLotNote(lotNumber));

    return subscribeToLotNotes(() => {
      setNoteState(getLotNote(lotNumber));
    });
  }, [lotNumber]);

  return [
    note,
    (nextNote: string) => {
      setNoteState(nextNote);
      setLotNote(lotNumber, nextNote);
    },
  ] as const;
}
