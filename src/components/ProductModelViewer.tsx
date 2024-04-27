'use client'

import { useEffect, useRef, useState } from 'react'

interface ProductModelViewerProps {
  imageUrl: string
  modelUrl: string
}

export const ProductModelViewer = ({ imageUrl, modelUrl }: ProductModelViewerProps) => {
  const modelViewerRef = useRef<HTMLElement>(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const modelViewer = modelViewerRef.current

    if (modelViewer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleArStatus = (event: any) => {
        if (event.detail.status === 'failed') {
          setShowError(true)

          const transitionEnd = () => setShowError(false)
          modelViewer.addEventListener('transitionend', transitionEnd)

          return () => modelViewer.removeEventListener('transitionend', transitionEnd)
        }
      }

      modelViewer.addEventListener('ar-status', handleArStatus)

      return () => {
        modelViewer.removeEventListener('ar-status', handleArStatus)
      }
    }
  }, [])

  return (
    <model-viewer
      poster={imageUrl}
      ref={modelViewerRef}
      style={{ width: '100%', height: '100%' }}
      src={modelUrl}
      shadow-intensity='1'
      camera-controls
      camera-orbit='10deg 80deg 80m'
      tone-mapping='neutral'
      alt='3D Model Viewer'
      data-ar
      ar-modes='webxr scene-viewer quick-look'
    >
      {showError && <div>AR is not supported on this device</div>}
    </model-viewer>
  )
}
