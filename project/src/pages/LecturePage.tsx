import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { Lecture } from '../types';
import { mockLectures } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

const LecturePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch from API
    setIsLoading(true);
    try {
      const found = mockLectures.find(l => l.id === id);
      if (found) {
        setLecture(found);
      } else {
        setError('Lecture not found');
      }
    } catch (err) {
      setError('Failed to load lecture');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !lecture) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Lectures
        </button>

        <VideoPlayer
          videoId={lecture.id}
          videoUrl={lecture.videoUrl}
          title={lecture.title}
          duration={lecture.duration}
        />

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{lecture.title}</h2>
          <p className="text-gray-600 leading-relaxed">{lecture.description}</p>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;