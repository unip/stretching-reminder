export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: 'neck' | 'shoulders' | 'arms' | 'back' | 'legs' | 'wrists' | 'seated' | 'standing';
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string[];
}

export const EXERCISE_LIBRARY: Exercise[] = [
  // Neck Exercises
  {
    id: 'neck-1',
    name: 'Neck Tilt',
    description: 'Gently tilt your head to one side, bringing your ear toward your shoulder.',
    duration: '15-20 seconds each side',
    category: 'neck',
    difficulty: 'easy',
    instructions: [
      'Sit or stand with your back straight',
      'Slowly tilt your head to the right',
      'Bring your right ear toward your right shoulder',
      'Hold for 15-20 seconds',
      'Return to center and repeat on the left side',
    ],
  },
  {
    id: 'neck-2',
    name: 'Neck Rotation',
    description: 'Slowly rotate your head in a circular motion.',
    duration: '5 rotations each direction',
    category: 'neck',
    difficulty: 'easy',
    instructions: [
      'Keep your shoulders relaxed',
      'Slowly rotate your head clockwise',
      'Complete 5 full rotations',
      'Reverse direction and rotate counterclockwise',
    ],
  },
  {
    id: 'neck-3',
    name: 'Chin Tuck',
    description: 'Pull your chin straight back to counteract forward head posture.',
    duration: '5 seconds hold, 10 repetitions',
    category: 'neck',
    difficulty: 'easy',
    instructions: [
      'Sit with your back straight',
      'Pull your chin straight back',
      'Create a "double chin" position',
      'Hold for 5 seconds',
      'Release and repeat 10 times',
    ],
  },

  // Shoulder Exercises
  {
    id: 'shoulder-1',
    name: 'Shoulder Rolls',
    description: 'Roll your shoulders backward and forward to release tension.',
    duration: '10 rotations each direction',
    category: 'shoulders',
    difficulty: 'easy',
    instructions: [
      'Sit or stand with arms at your sides',
      'Lift your shoulders up toward your ears',
      'Roll them back and down',
      'Complete 10 backward rotations',
      'Reverse direction for 10 forward rotations',
    ],
  },
  {
    id: 'shoulder-2',
    name: 'Shoulder Blade Squeeze',
    description: 'Squeeze your shoulder blades together to open up your chest.',
    duration: '5 seconds hold, 10 repetitions',
    category: 'shoulders',
    difficulty: 'easy',
    instructions: [
      'Sit or stand with arms at your sides',
      'Squeeze your shoulder blades together',
      'Pull them down and back',
      'Hold for 5 seconds',
      'Release and repeat 10 times',
    ],
  },
  {
    id: 'shoulder-3',
    name: 'Cross-Body Shoulder Stretch',
    description: 'Stretch your shoulders by pulling one arm across your chest.',
    duration: '20-30 seconds each arm',
    category: 'shoulders',
    difficulty: 'easy',
    instructions: [
      'Bring your right arm across your chest',
      'Use your left hand to gently pull it closer',
      'Keep your right shoulder down',
      'Hold for 20-30 seconds',
      'Switch arms and repeat',
    ],
  },

  // Arm Exercises
  {
    id: 'arm-1',
    name: 'Overhead Reach',
    description: 'Reach your arms overhead to stretch your entire upper body.',
    duration: '20-30 seconds',
    category: 'arms',
    difficulty: 'easy',
    instructions: [
      'Interlace your fingers',
      'Turn your palms toward the ceiling',
      'Reach your arms overhead',
      'Feel the stretch through your arms and sides',
      'Hold for 20-30 seconds',
    ],
  },
  {
    id: 'arm-2',
    name: 'Triceps Stretch',
    description: 'Stretch the back of your arms.',
    duration: '20-30 seconds each arm',
    category: 'arms',
    difficulty: 'easy',
    instructions: [
      'Raise your right arm overhead',
      'Bend your elbow, dropping your hand behind your head',
      'Use your left hand to gently push your right elbow',
      'Hold for 20-30 seconds',
      'Switch arms and repeat',
    ],
  },
  {
    id: 'arm-3',
    name: 'Arm Circles',
    description: 'Make circles with your arms to loosen up your shoulders.',
    duration: '15-20 seconds each direction',
    category: 'arms',
    difficulty: 'easy',
    instructions: [
      'Extend your arms out to the sides',
      'Make small circles forward',
      'Gradually increase the circle size',
      'Continue for 15-20 seconds',
      'Reverse direction',
    ],
  },

  // Wrist Exercises
  {
    id: 'wrist-1',
    name: 'Wrist Circles',
    description: 'Rotate your wrists to relieve tension from typing.',
    duration: '10 rotations each direction',
    category: 'wrists',
    difficulty: 'easy',
    instructions: [
      'Extend your arms in front of you',
      'Make fists with both hands',
      'Rotate your wrists in circles',
      'Complete 10 rotations clockwise',
      'Reverse direction for 10 counterclockwise',
    ],
  },
  {
    id: 'wrist-2',
    name: 'Wrist Flexor Stretch',
    description: 'Stretch the underside of your forearms.',
    duration: '15-20 seconds each wrist',
    category: 'wrists',
    difficulty: 'easy',
    instructions: [
      'Extend your right arm forward',
      'Point your fingers up, palm facing out',
      'Use your left hand to gently pull fingers back',
      'Hold for 15-20 seconds',
      'Switch wrists and repeat',
    ],
  },
  {
    id: 'wrist-3',
    name: 'Wrist Extensor Stretch',
    description: 'Stretch the top of your forearms.',
    duration: '15-20 seconds each wrist',
    category: 'wrists',
    difficulty: 'easy',
    instructions: [
      'Extend your right arm forward',
      'Point your fingers down, palm facing out',
      'Use your left hand to gently push hand toward you',
      'Hold for 15-20 seconds',
      'Switch wrists and repeat',
    ],
  },

  // Back Exercises
  {
    id: 'back-1',
    name: 'Seated Spinal Twist',
    description: 'Twist your torso to stretch your back muscles.',
    duration: '20-30 seconds each side',
    category: 'back',
    difficulty: 'medium',
    instructions: [
      'Sit on the edge of your chair',
      'Place your right hand on the back of the chair',
      'Place your left hand on your right knee',
      'Gently twist to the right',
      'Hold for 20-30 seconds',
      'Repeat on the other side',
    ],
  },
  {
    id: 'back-2',
    name: 'Cat-Cow Stretch',
    description: 'Alternate between arching and rounding your back.',
    duration: '10 repetitions',
    category: 'back',
    difficulty: 'easy',
    instructions: [
      'Stand with hands on your hips',
      'Arch your back, looking up (Cow)',
      'Round your back, tucking your chin (Cat)',
      'Alternate between positions',
      'Complete 10 repetitions',
    ],
  },
  {
    id: 'back-3',
    name: 'Standing Back Extension',
    description: 'Gently arch your back to counteract hunching.',
    duration: '10-15 seconds, 5 repetitions',
    category: 'back',
    difficulty: 'easy',
    instructions: [
      'Stand with feet hip-width apart',
      'Place your hands on your lower back',
      'Gently arch backward',
      'Look up toward the ceiling',
      'Hold for 10-15 seconds',
      'Return to neutral and repeat',
    ],
  },

  // Leg Exercises
  {
    id: 'leg-1',
    name: 'Standing Quad Stretch',
    description: 'Stretch the front of your thighs.',
    duration: '20-30 seconds each leg',
    category: 'legs',
    difficulty: 'medium',
    instructions: [
      'Stand next to your desk for balance',
      'Bend your right knee',
      'Grab your right ankle with your right hand',
      'Pull your heel toward your glutes',
      'Hold for 20-30 seconds',
      'Switch legs and repeat',
    ],
  },
  {
    id: 'leg-2',
    name: 'Hamstring Stretch',
    description: 'Stretch the back of your thighs.',
    duration: '20-30 seconds each leg',
    category: 'legs',
    difficulty: 'easy',
    instructions: [
      'Extend your right leg forward, heel on ground',
      'Keep your right knee straight',
      'Hinge at your hips, lean forward slightly',
      'Feel the stretch in the back of your thigh',
      'Hold for 20-30 seconds',
      'Switch legs and repeat',
    ],
  },
  {
    id: 'leg-3',
    name: 'Calf Raise',
    description: 'Strengthen and stretch your calves.',
    duration: '15-20 repetitions',
    category: 'legs',
    difficulty: 'easy',
    instructions: [
      'Stand with feet hip-width apart',
      'Rise up onto your tiptoes',
      'Hold for 2 seconds at the top',
      'Lower back down slowly',
      'Repeat 15-20 times',
    ],
  },
  {
    id: 'leg-4',
    name: 'Ankle Circles',
    description: 'Rotate your ankles to improve circulation.',
    duration: '10 rotations each direction, each ankle',
    category: 'legs',
    difficulty: 'easy',
    instructions: [
      'Lift your right foot off the ground',
      'Rotate your ankle in circles',
      'Complete 10 rotations clockwise',
      'Reverse direction for 10 counterclockwise',
      'Switch to the left ankle',
    ],
  },

  // Seated Exercises
  {
    id: 'seated-1',
    name: 'Seated Marching',
    description: 'March in place while seated to get your blood flowing.',
    duration: '30-60 seconds',
    category: 'seated',
    difficulty: 'easy',
    instructions: [
      'Sit up straight in your chair',
      'Lift your right knee toward your chest',
      'Lower it and lift your left knee',
      'Continue alternating in a marching motion',
      'Pump your arms as you march',
      'Continue for 30-60 seconds',
    ],
  },
  {
    id: 'seated-2',
    name: 'Seated Knee Extension',
    description: 'Straighten your legs to stretch your knees and thighs.',
    duration: '10-15 repetitions each leg',
    category: 'seated',
    difficulty: 'easy',
    instructions: [
      'Sit with your back against the chair',
      'Slowly straighten your right leg',
      'Hold for 2-3 seconds',
      'Lower back down',
      'Repeat 10-15 times',
      'Switch to the left leg',
    ],
  },
  {
    id: 'seated-3',
    name: 'Seated Hip Flexor Stretch',
    description: 'Stretch your hip flexors while seated.',
    duration: '20-30 seconds each side',
    category: 'seated',
    difficulty: 'medium',
    instructions: [
      'Sit on the edge of your chair',
      'Extend your right leg back, toes on floor',
      'Keep your left foot flat on the floor',
      'Gently push your hips forward',
      'Feel the stretch in your right hip',
      'Hold for 20-30 seconds',
      'Switch legs and repeat',
    ],
  },

  // Standing Exercises
  {
    id: 'standing-1',
    name: 'Standing Side Stretch',
    description: 'Stretch your sides and obliques.',
    duration: '20-30 seconds each side',
    category: 'standing',
    difficulty: 'easy',
    instructions: [
      'Stand with feet hip-width apart',
      'Reach your right arm overhead',
      'Lean to your left side',
      'Feel the stretch along your right side',
      'Hold for 20-30 seconds',
      'Repeat on the other side',
    ],
  },
  {
    id: 'standing-2',
    name: 'Standing Forward Fold',
    description: 'Bend forward to stretch your entire back side.',
    duration: '20-30 seconds',
    category: 'standing',
    difficulty: 'medium',
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at your hips, folding forward',
      'Let your arms hang toward the floor',
      'Keep a slight bend in your knees',
      'Relax your head and neck',
      'Hold for 20-30 seconds',
      'Slowly roll back up',
    ],
  },
  {
    id: 'standing-3',
    name: 'Standing Chest Opener',
    description: 'Open up your chest and front shoulders.',
    duration: '20-30 seconds',
    category: 'standing',
    difficulty: 'easy',
    instructions: [
      'Stand with feet hip-width apart',
      'Clasp your hands behind your back',
      'Straighten your arms',
      'Lift your chest and squeeze shoulder blades',
      'Hold for 20-30 seconds',
      'Release and shake out your arms',
    ],
  },
];

export const EXERCISE_CATEGORIES = [
  'neck',
  'shoulders',
  'arms',
  'wrists',
  'back',
  'legs',
  'seated',
  'standing',
] as const;

export const EXERCISE_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

/**
 * Get a random exercise with smart rotation
 * Ensures no immediate repeats and varies categories
 */
export function getRandomExercise(
  lastExerciseId?: string,
  lastCategory?: string,
  preferredDifficulty?: string
): Exercise {
  let availableExercises = EXERCISE_LIBRARY;

  // Filter out the last exercise to avoid immediate repeats
  if (lastExerciseId) {
    availableExercises = availableExercises.filter((ex) => ex.id !== lastExerciseId);
  }

  // Prefer different category than last time
  if (lastCategory) {
    const differentCategory = availableExercises.filter((ex) => ex.category !== lastCategory);
    if (differentCategory.length > 0) {
      availableExercises = differentCategory;
    }
  }

  // Optionally filter by difficulty
  if (preferredDifficulty) {
    const byDifficulty = availableExercises.filter(
      (ex) => ex.difficulty === preferredDifficulty
    );
    if (byDifficulty.length > 0) {
      availableExercises = byDifficulty;
    }
  }

  // Pick random exercise from available
  const randomIndex = Math.floor(Math.random() * availableExercises.length);
  return availableExercises[randomIndex];
}

/**
 * Get exercises by category
 */
export function getExercisesByCategory(category: string): Exercise[] {
  return EXERCISE_LIBRARY.filter((ex) => ex.category === category);
}

/**
 * Get exercises by difficulty
 */
export function getExercisesByDifficulty(difficulty: string): Exercise[] {
  return EXERCISE_LIBRARY.filter((ex) => ex.difficulty === difficulty);
}

/**
 * Get quick exercises (under 30 seconds)
 */
export function getQuickExercises(): Exercise[] {
  return EXERCISE_LIBRARY.filter((ex) => ex.duration.includes('15') || ex.duration.includes('20'));
}
