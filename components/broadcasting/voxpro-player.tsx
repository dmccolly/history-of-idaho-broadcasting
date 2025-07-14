'use client'

import { useState, useEffect } from 'react'
import { supabase, MediaFile, mockMediaFiles, isSupabaseAvailable } from '@/lib/supabase'
import { Play, Pause, Volume2, Download, FileText, Music, Video } from 'lucide-react'

interface VoxProPlayerProps {
  className?: string
}

export default function VoxProPlayer({ className = '' }: VoxProPlayerProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [selectedKey, setSelectedKey] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFile, setCurrentFile] = useState<MediaFile | null>(null)

  useEffect(() => {
    // Load data - use mock data if Supabase is not available
    const loadData = async () => {
      if (isSupabaseAvailable) {
        try {
          const { data, error } = await supabase.from('media_files').select('*').order('key_assignment')
          
          if (data && !error) {
            setMediaFiles(data)
            setIsConnected(true)
            return
          }
        } catch (err) {
          console.warn('Supabase connection failed, using mock data')
        }
      }
      
      // Use mock data as fallback
      setMediaFiles(mockMediaFiles)
      setIsConnected(false)
    }

    loadData()
  }, [])

  const handleKeyClick = (keyNumber: number) => {
    setSelectedKey(keyNumber)
    const file = mediaFiles.find(f => f.key_assignment === keyNumber)
    if (file) {
      setCurrentFile(file)
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('audio')) return <Music className="w-4 h-4" />
    if (fileType.includes('video')) return <Video className="w-4 h-4" />
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const getKeyColor = (keyNumber: number) => {
    const colors = [
      'bg-green-500 hover:bg-green-600',
      'bg-red-500 hover:bg-red-600', 
      'bg-blue-500 hover:bg-blue-600',
      'bg-yellow-500 hover:bg-yellow-600',
      'bg-purple-500 hover:bg-purple-600'
    ]
    return colors[keyNumber - 1] || 'bg-gray-500 hover:bg-gray-600'
  }

  return (
    <div className={`bg-slate-800 rounded-2xl border border-slate-600 p-8 text-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">VoxPro Media Player</h3>
          <p className="text-slate-300">Professional Broadcasting Control</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-slate-300 font-medium">
            {isConnected ? 'Live Connection' : 'Demo Mode'}
          </span>
        </div>
      </div>

      {/* Key Buttons */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((keyNumber) => (
          <button
            key={keyNumber}
            onClick={() => handleKeyClick(keyNumber)}
            className={`
              ${getKeyColor(keyNumber)}
              ${selectedKey === keyNumber ? 'ring-4 ring-white ring-opacity-50 scale-105' : 'hover:scale-105'}
              text-white font-bold py-6 px-3 rounded-xl transition-all duration-300
              flex flex-col items-center justify-center min-h-[100px]
              shadow-lg hover:shadow-xl
            `}
          >
            <span className="text-3xl mb-2 font-extrabold">{keyNumber}</span>
            <span className="text-xs opacity-80 font-medium">
              KEY {keyNumber < 10 ? `0${keyNumber}` : keyNumber}
            </span>
          </button>
        ))}
      </div>

      {/* Current Selection Display */}
      {currentFile && (
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-600 rounded-lg">
                  {getFileIcon(currentFile.file_type)}
                </div>
                <h4 className="font-bold text-white text-lg">Key {currentFile.key_assignment}</h4>
                <span className="text-xs bg-slate-600 text-slate-200 px-3 py-1 rounded-full font-medium">
                  {currentFile.file_type}
                </span>
              </div>
              <h5 className="font-semibold text-white mb-2 text-lg">{currentFile.title}</h5>
              <p className="text-slate-300 mb-3 leading-relaxed">{currentFile.description}</p>
              <p className="text-sm text-slate-400">
                By {currentFile.author} • {currentFile.date}
              </p>
            </div>
            <div className="flex space-x-3 ml-6">
              {currentFile.file_type.includes('audio') || currentFile.file_type.includes('video') ? (
                <button
                  onClick={togglePlayback}
                  className="bg-green-600 hover:bg-green-700 p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              ) : null}
              <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Player Controls */}
      {currentFile && (currentFile.file_type.includes('audio') || currentFile.file_type.includes('video')) && (
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6">
          <div className="flex items-center space-x-6">
            <button
              onClick={togglePlayback}
              className="bg-green-600 hover:bg-green-700 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <div className="flex-1">
              <div className="bg-slate-600 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full w-1/3 transition-all duration-300"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-slate-300" />
              <div className="bg-slate-600 rounded-full h-2 w-24">
                <div className="bg-white h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

