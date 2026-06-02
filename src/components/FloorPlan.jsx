import { useEffect, useState } from "react";

const STATUS_COLORS = {
  AVAILABLE_LONG: "#12b76a",
  AVAILABLE_SHORT: "#12b76a",
  available: "#12b76a",
  SOON: "#fdb022",
  soon: "#fdb022",
  IN_USE: "#f04438",
  busy: "#f04438",
};

function FloorPlanSvg({ svgUrl, room }) {
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);

  useEffect(() => {
    if (!svgUrl) return;

    setLoading(true);
    setError(false);
    setSvgContent(null);

    fetch(svgUrl)
      .then((res) => {
        if (!res.ok) throw new Error("SVG fetch failed");
        return res.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const doc    = parser.parseFromString(text, "image/svg+xml");

        if (doc.querySelector("parsererror")) throw new Error("SVG parse error");

        const svgEl = doc.querySelector("svg");
        if (!svgEl) throw new Error("No <svg> found");

        svgEl.setAttribute("width",  "100%");
        svgEl.setAttribute("height", "100%");

        const roomMap = new Map(room.map((c) => [String(c.roomName).trim(), c.status]));

        const cellGroups = Array.from(svgEl.querySelectorAll("[data-cell-id]"));

        cellGroups.forEach((cell) => {
          const textEl = cell.querySelector("text");
          if (!textEl) return;

          const rawText = textEl.textContent ?? "";
          const label = rawText.replace(/\s+/g, "").trim();
          if (!label) return;

          let status = roomMap.get(label);

          if (!status) return;

          const color = STATUS_COLORS[status];
          if (!color) return;

          const rect = cell.querySelector("rect");
          if (!rect) return;

          rect.setAttribute("fill",         color);
          rect.setAttribute("fill-opacity", "0.45");
        });

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svgEl));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [svgUrl, room]);

  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

const centerStyle = {
  width: "100%", height: "100%",
  display: "flex", alignItems: "center", justifyContent: "center"
};
const hintStyle = { color: "#9fb3c8", fontSize: 13 };

export default FloorPlanSvg;