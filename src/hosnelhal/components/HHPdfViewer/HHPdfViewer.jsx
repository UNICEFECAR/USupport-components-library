import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import { HHButton } from "../HHButton/HHButton";

import "./hh-pdf-viewer.scss";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

/**
 * HHPdfViewer
 *
 * Renders a PDF page by page in the browser with page navigation, zoom,
 * print and download
 *
 * @return {jsx}
 */
export const HHPdfViewer = ({
  url,
  labels,
  onDownload,
  loading,
  error,
  pageWidth = 550,
}) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  // Fit the page to the available width
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    // Measure right away too - the observer only reports once the page renders
    setWidth(element.clientWidth);
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPageNumber(1);
  }, [url]);

  const changeZoom = (delta) => {
    setZoom((current) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current + delta)));
  };

  return (
    <div className="hh-pdf-viewer">
      <div className="hh-pdf-viewer__toolbar">
        <div className="hh-pdf-viewer__group">
          <button
            type="button"
            className="hh-pdf-viewer__control"
            onClick={() => setPageNumber((page) => page - 1)}
            disabled={pageNumber <= 1}
            aria-label={labels.previousPage}
          >
            ‹
          </button>
          <span aria-live="polite">{labels.pageOf(pageNumber, pageCount || 1)}</span>
          <button
            type="button"
            className="hh-pdf-viewer__control"
            onClick={() => setPageNumber((page) => page + 1)}
            disabled={!pageCount || pageNumber >= pageCount}
            aria-label={labels.nextPage}
          >
            ›
          </button>
        </div>

        <div className="hh-pdf-viewer__group">
          <button
            type="button"
            className="hh-pdf-viewer__control"
            onClick={() => changeZoom(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label={labels.zoomOut}
          >
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="hh-pdf-viewer__control"
            onClick={() => changeZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label={labels.zoomIn}
          >
            +
          </button>
        </div>

        <div className="hh-pdf-viewer__group">
          <HHButton variant="text" href={url} target="_blank" rel="noopener noreferrer">
            {labels.print}
          </HHButton>
          <HHButton variant="text" href={url} download onClick={onDownload}>
            {labels.download}
          </HHButton>
        </div>
      </div>

      <div className="hh-pdf-viewer__preview" ref={containerRef}>
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading={<div className="hh-pdf-viewer__status">{loading}</div>}
          error={<div className="hh-pdf-viewer__status">{error}</div>}
        >
          {width > 0 && (
            <Page
              pageNumber={pageNumber}
              width={Math.min(width, pageWidth) * zoom}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      </div>
    </div>
  );
};

HHPdfViewer.propTypes = {
  url: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    previousPage: PropTypes.string.isRequired,
    nextPage: PropTypes.string.isRequired,
    /** (page, total) => "Page 1 of 5" */
    pageOf: PropTypes.func.isRequired,
    zoomIn: PropTypes.string.isRequired,
    zoomOut: PropTypes.string.isRequired,
    print: PropTypes.node.isRequired,
    download: PropTypes.node.isRequired,
  }).isRequired,
  onDownload: PropTypes.func,
  /** Page width at 100% zoom, in pixels (narrower screens fit the page) */
  pageWidth: PropTypes.number,
  loading: PropTypes.node,
  error: PropTypes.node,
};
