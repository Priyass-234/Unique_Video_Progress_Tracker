import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LectureCard from '../components/LectureCard';
import { Lecture } from '../types';
import { mockLectures } from '../data/mockData';
import { BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [lectures] = useState<Lecture[]>(mockLectures);

  const handleLectureClick = (lecture: Lecture) => {
    navigate(`/lecture/${lecture.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">LearnTrack</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">My Lectures</h2>
          <p className="text-gray-600 max-w-3xl">
            Continue learning where you left off. Your progress is tracked accurately based on the unique parts of each video you've watched.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map(lecture => (
            <LectureCard 
              key={lecture.id} 
              lecture={lecture} 
              onClick={handleLectureClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;