<template>
  <div class="skeleton-warpper">
    <!-- https://skeletonreact.com/ -->
    <svg
      role="img"
      width="100%"
      height="100%"
      aria-labelledby="loading-aria"
      viewBox="0 0 375 812"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path)"
        style="fill: url('#fill');"
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="16" rx="3" ry="3" width="30%" height="16" />
          <rect x="0" y="48" rx="3" ry="3" width="50%" height="16" />
          <rect x="0" y="88" rx="3" ry="3" width="40%" height="16" />
          <rect x="44%" y="88" rx="3" ry="3" width="40%" height="16" />
          <circle cx="40" cy="144" r="20" />
          <rect x="0" y="136" rx="6" ry="6" width="100%" height="140" />

          <rect x="0" y="300" rx="3" ry="3" width="67" height="16" />
          <rect x="80" y="300" rx="3" ry="3" width="40%" height="16" />
          <rect x="16" y="332" rx="3" ry="3" width="40%" height="16" />
          <rect x="48%" y="332" rx="3" ry="3" width="44%" height="16" />
          <rect x="16" y="364" rx="3" ry="3" width="26%" height="16" />
          <rect x="34%" y="364" rx="3" ry="3" width="18%" height="16" />
          <rect x="56%" y="364" rx="3" ry="3" width="23%" height="16" />

          <rect x="0" y="412" rx="3" ry="3" width="67" height="16" />
          <rect x="80" y="412" rx="3" ry="3" width="40%" height="16" />
          <rect x="16" y="444" rx="3" ry="3" width="40%" height="16" />
          <rect x="48%" y="444" rx="3" ry="3" width="44%" height="16" />
          <rect x="16" y="476" rx="3" ry="3" width="26%" height="16" />
          <rect x="34%" y="476" rx="3" ry="3" width="18%" height="16" />
          <rect x="56%" y="476" rx="3" ry="3" width="23%" height="16" />

          <rect x="0" y="524" rx="3" ry="3" width="67" height="16" />
          <rect x="80" y="524" rx="3" ry="3" width="40%" height="16" />
          <rect x="16" y="556" rx="3" ry="3" width="40%" height="16" />
          <rect x="48%" y="556" rx="3" ry="3" width="44%" height="16" />
          <rect x="16" y="588" rx="3" ry="3" width="26%" height="16" />
          <rect x="34%" y="588" rx="3" ry="3" width="18%" height="16" />
          <rect x="56%" y="588" rx="3" ry="3" width="23%" height="16" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Skeleton1',
};
</script>
