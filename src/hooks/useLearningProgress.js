import { useState, useEffect } from 'react';

export function useLearningProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('andres_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading progress from localStorage", e);
    }
    return {
      completedModules: [],
      completedLessons: [],
      currentLevel: 'beginner'
    };
  });

  useEffect(() => {
    localStorage.setItem('andres_progress', JSON.stringify(progress));
  }, [progress]);

  const markModuleCompleted = (moduleId) => {
    setProgress(prev => {
      if (!prev.completedModules.includes(moduleId)) {
        return { ...prev, completedModules: [...prev.completedModules, moduleId] };
      }
      return prev;
    });
  };

  const markLessonCompleted = (lessonId) => {
    setProgress(prev => {
      // Initialize completedLessons if it doesn't exist from an older save
      const currentLessons = prev.completedLessons || [];
      if (!currentLessons.includes(lessonId)) {
        return { ...prev, completedLessons: [...currentLessons, lessonId] };
      }
      return prev;
    });
  };

  const isModuleCompleted = (moduleId) => {
    return progress.completedModules.includes(moduleId);
  };

  const isLessonCompleted = (lessonId) => {
    return (progress.completedLessons || []).includes(lessonId);
  };

  return {
    progress,
    markModuleCompleted,
    markLessonCompleted,
    isModuleCompleted,
    isLessonCompleted
  };
}
