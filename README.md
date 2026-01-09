# Silben-Puzzle 🎓

Eine interaktive Web-Anwendung für Grundschüler zum Trainieren der Silben-Zusammensetzung.

## Features

✨ **Benutzerfreundlich:** Intuitive Drag-and-Drop-Bedienung
🎯 **Lerneffektiv:** Silben müssen in der richtigen Reihenfolge zusammengesetzt werden
📱 **Responsive:** Funktioniert auf Tablets, Smartphones und Computern
🎨 **Ansprechend:** Farbenfrohe, kinderfreundliche Gestaltung
⭐ **Fortschritt:** Visueller Fortschrittsbalken

## Wie funktioniert es?

1. Dem Kind wird eine Aufgabe gestellt: "Bilde das Wort X"
2. Mehrere Silben werden angezeigt
3. Das Kind zieht die Silben in der richtigen Reihenfolge in das Eingabefeld
4. Mit dem Button "Überprüfen" kann die Antwort kontrolliert werden
5. Nach 10 abgeschlossenen Aufgaben ist die Übung beendet

## Installation & Deployment

### Option 1: GitHub Pages (kostenlos, empfohlen)

1. Repository erstellen auf GitHub
2. Diese Dateien in das Repository hochladen:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

3. In den Repository-Einstellungen unter "Pages" aktivieren:
   - Source: Main Branch
   - Folder: / (root)

4. Die Anwendung ist dann unter `https://[dein-username].github.io/[repo-name]/` erreichbar

### Option 2: Lokal ausführen

1. Dateien in einen Ordner speichern
2. `index.html` im Browser öffnen

## Wörter anpassen

Die Wörter und Silben können in `script.js` angepasst werden. Im Array `words` können neue Einträge hinzugefügt werden:

```javascript
const words = [
    { word: 'BEISPIEL', syllables: ['BEI', 'SPIEL'] },
    // ... weitere Wörter
];
```

## Technologie

- HTML5
- CSS3 (mit Gradient, Flexbox, Responsive Design)
- Vanilla JavaScript (ohne externe Abhängigkeiten)

## Browser-Kompatibilität

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Mobile Browser

## Lizenz

Frei verwendbar für Bildungszwecke

---

Viel Spaß beim Lernen! 🎓✨