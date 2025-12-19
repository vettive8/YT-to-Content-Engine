
import { TranscriptionResult } from "../types";

export function exportToTXT(result: TranscriptionResult): string {
  let output = `Title: ${result.title}\n\n`;
  result.segments.forEach(s => {
    output += `[${s.start} - ${s.end}] ${s.speaker}: ${s.text}\n`;
  });
  return output;
}

export function exportToSRT(result: TranscriptionResult): string {
  return result.segments.map((s, i) => {
    const start = formatSRTTime(s.start);
    const end = formatSRTTime(s.end);
    return `${i + 1}\n${start} --> ${end}\n${s.speaker}: ${s.text}\n`;
  }).join('\n');
}

export function exportToVTT(result: TranscriptionResult): string {
  let output = "WEBVTT\n\n";
  result.segments.forEach((s, i) => {
    const start = formatVTTTime(s.start);
    const end = formatVTTTime(s.end);
    output += `${start} --> ${end}\n${s.speaker}: ${s.text}\n\n`;
  });
  return output;
}

function formatSRTTime(timeStr: string): string {
  // Assume timeStr is "MM:SS" or "HH:MM:SS"
  const parts = timeStr.split(':');
  let h = "00", m = "00", s = "00";
  if (parts.length === 3) {
    [h, m, s] = parts;
  } else {
    [m, s] = parts;
  }
  return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')},000`;
}

function formatVTTTime(timeStr: string): string {
  const parts = timeStr.split(':');
  let h = "00", m = "00", s = "00";
  if (parts.length === 3) {
    [h, m, s] = parts;
  } else {
    [m, s] = parts;
  }
  return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}.000`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
