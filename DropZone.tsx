/**
 * DropZone — native React dropzone styled to match the Media Manager upload card.
 */
import React, { useRef, useState } from "react";

export type DropZoneFile = File;

export interface DropZoneProps {
  accept?: string;
  allowMultiple?: boolean;
  disabled?: boolean;
  type?: "file" | "image";
  label?: string;
  onDrop?: (files: File[], accepted: File[], rejected: File[]) => void;
  onDropAccepted?: (files: File[]) => void;
  children?: React.ReactNode;
  outline?: boolean;
  error?: boolean;
  labelHidden?: boolean;
  overlayText?: string;
}

function fileMatchesAccept(file: File, accept?: string, type?: "file" | "image"): boolean {
  if (type === "image" && !file.type.startsWith("image/")) return false;
  if (!accept?.trim()) return true;

  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!tokens.length) return true;

  const fileName = file.name.toLowerCase();
  const mime = (file.type || "").toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith(".")) return fileName.endsWith(token);
    if (token.endsWith("/*")) return mime.startsWith(token.slice(0, -1));
    return mime === token;
  });
}

function DropZoneComponent({
  accept,
  allowMultiple,
  disabled,
  type,
  label,
  onDrop,
  onDropAccepted,
  children,
  outline,
  error,
  labelHidden,
  overlayText,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const emitFiles = (files: File[]) => {
    if (!files.length) return;
    const picked = allowMultiple ? files : files.slice(0, 1);
    const accepted = picked.filter((f) => fileMatchesAccept(f, accept, type));
    const rejected = picked.filter((f) => !fileMatchesAccept(f, accept, type));
    onDrop?.(picked, accepted, rejected);
    if (accepted.length) onDropAccepted?.(accepted);
  };

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    emitFiles(Array.from(e.target.files || []));
    e.currentTarget.value = "";
  };

  return (
    <div style={{ width: "100%" }}>
      {!labelHidden && label && (
        <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#202223" }}>{label}</div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={allowMultiple}
        onChange={handleInputChange}
        style={{ display: "none" }}
        aria-label={label || "Upload file"}
      />

      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          if (disabled) return;
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false);
        }}
        onDrop={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(false);
          emitFiles(Array.from(e.dataTransfer.files || []));
        }}
        style={{
          width: "100%",
          minHeight: 176,
          borderRadius: 8,
          border: `2px ${outline ? "solid" : "dashed"} ${error ? "#D72C0D" : dragOver ? "#005BD3" : "#E1E3E5"}`,
          background: dragOver ? "#EBF2FF" : "transparent",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color 0.1s, box-shadow 0.1s, opacity 0.15s, background 0.15s",
          color: "#202223",
          opacity: disabled ? 0.6 : 1,
          position: "relative",
        }}
      >
        {children}

        {dragOver && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,91,211,0.08)",
              borderRadius: 8,
              pointerEvents: "none",
              fontSize: 15,
              fontWeight: 600,
              color: "#005BD3",
            }}
          >
            {overlayText || "Drop to upload"}
          </div>
        )}
      </button>
    </div>
  );
}

export const DropZone = Object.assign(DropZoneComponent, {
  FileUpload({ actionTitle = "Add files", actionHint }: { actionTitle?: string; actionHint?: string }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 28, lineHeight: 1 }}>📤</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{actionTitle}</div>
        {actionHint && <div style={{ fontSize: 12, color: "#6D7175" }}>{actionHint}</div>}
      </div>
    );
  },
});
