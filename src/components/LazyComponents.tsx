import { lazy } from 'react';

// Lazy loading des composants lourds
export const LazyDetailedResultsChart = lazy(() => 
  import('./Quiz/Results/DetailedResultsChart').then(module => ({ 
    default: module.DetailedResultsChart 
  }))
);

export const LazySkinRadarChart = lazy(() => 
  import('./Quiz/Results/components/SkinRadarChart').then(module => ({ 
    default: module.SkinRadarChart 
  }))
);

export const LazyAdvancedAnalysisDisplay = lazy(() => 
  import('./Quiz/Results/components/AdvancedAnalysisDisplay').then(module => ({ 
    default: module.AdvancedAnalysisDisplay 
  }))
);

export const LazyPersonalizedRecommendations = lazy(() => 
  import('./Quiz/Results/PersonalizedRecommendations').then(module => ({ 
    default: module.PersonalizedRecommendations 
  }))
); 