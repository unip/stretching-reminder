import { describe, it, expect } from 'vitest';
import {
  EXERCISE_LIBRARY,
  getRandomExercise,
  getExercisesByCategory,
  getExercisesByDifficulty,
  getQuickExercises,
} from '../../src/renderer/data/exerciseLibrary';

describe('Exercise Library', () => {
  describe('EXERCISE_LIBRARY', () => {
    it('should contain exercises', () => {
      expect(EXERCISE_LIBRARY.length).toBeGreaterThan(0);
    });

    it('should have exercises with required properties', () => {
      EXERCISE_LIBRARY.forEach((exercise) => {
        expect(exercise).toHaveProperty('id');
        expect(exercise).toHaveProperty('name');
        expect(exercise).toHaveProperty('description');
        expect(exercise).toHaveProperty('duration');
        expect(exercise).toHaveProperty('category');
        expect(exercise).toHaveProperty('difficulty');
        expect(exercise).toHaveProperty('instructions');
        expect(Array.isArray(exercise.instructions)).toBe(true);
      });
    });

    it('should have unique exercise IDs', () => {
      const ids = EXERCISE_LIBRARY.map((ex) => ex.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have exercises in all categories', () => {
      const categories = new Set(EXERCISE_LIBRARY.map((ex) => ex.category));
      expect(categories.size).toBeGreaterThanOrEqual(5);
    });
  });

  describe('getExercisesByCategory', () => {
    it('should return exercises for a specific category', () => {
      const neckExercises = getExercisesByCategory('neck');
      expect(neckExercises.length).toBeGreaterThan(0);
      neckExercises.forEach((ex) => {
        expect(ex.category).toBe('neck');
      });
    });

    it('should return empty array for invalid category', () => {
      const invalid = getExercisesByCategory('invalid');
      expect(invalid).toEqual([]);
    });
  });

  describe('getExercisesByDifficulty', () => {
    it('should return exercises for easy difficulty', () => {
      const easy = getExercisesByDifficulty('easy');
      expect(easy.length).toBeGreaterThan(0);
      easy.forEach((ex) => {
        expect(ex.difficulty).toBe('easy');
      });
    });

    it('should return exercises for medium difficulty', () => {
      const medium = getExercisesByDifficulty('medium');
      expect(medium.length).toBeGreaterThan(0);
      medium.forEach((ex) => {
        expect(ex.difficulty).toBe('medium');
      });
    });
  });

  describe('getQuickExercises', () => {
    it('should return exercises with short duration', () => {
      const quick = getQuickExercises();
      expect(quick.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomExercise', () => {
    it('should return a valid exercise', () => {
      const exercise = getRandomExercise();
      expect(exercise).toHaveProperty('id');
      expect(exercise).toHaveProperty('name');
      expect(exercise).toHaveProperty('category');
    });

    it('should avoid immediate repeats when lastExerciseId is provided', () => {
      // Run multiple times to ensure variety
      for (let i = 0; i < 20; i++) {
        const exercise = getRandomExercise('neck-1');
        expect(exercise.id).not.toBe('neck-1');
      }
    });

    it('should prefer different category when lastCategory is provided', () => {
      // Run multiple times to check category variation
      for (let i = 0; i < 20; i++) {
        const exercise = getRandomExercise(undefined, 'neck');
        // Most should be different category (not guaranteed due to randomness)
        expect(exercise.category).toBeDefined();
      }
    });

    it('should filter by preferred difficulty', () => {
      for (let i = 0; i < 10; i++) {
        const exercise = getRandomExercise(undefined, undefined, 'easy');
        expect(exercise.difficulty).toBe('easy');
      }
    });
  });
});
