<template>
  <div class="skeleton-warpper">
    <!-- https://skeletonreact.com/ -->
    <svg
      role="img"
      width="100%"
      height="100%"
      aria-labelledby="loading-aria-2"
      viewBox="0 0 375 812"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="loading-aria-2">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path-2)"
        style="fill: url('#fill-2');"
      ></rect>
      <defs>
        <clipPath id="clip-path-2">
          <circle cx="32" cy="40" r="32" />
          <rect x="80" y="18" rx="5" ry="5" width="30%" height="20" />
          <rect x="55%" y="18" rx="5" ry="5" width="20" height="20" />
          <rect x="80" y="46" rx="5" ry="5" width="60%" height="16" />
          <rect x="0" y="94" rx="0" ry="0" width="100%" height="1" />

          <circle cx="32" cy="154" r="32" />
          <rect x="80" y="132" rx="5" ry="5" width="30%" height="20" />
          <rect x="55%" y="132" rx="5" ry="5" width="20" height="20" />
          <rect x="80" y="160" rx="5" ry="5" width="60%" height="16" />
          <rect x="0" y="208" rx="0" ry="0" width="100%" height="1" />

          <circle cx="32" cy="268" r="32" />
          <rect x="80" y="246" rx="5" ry="5" width="30%" height="20" />
          <rect x="55%" y="246" rx="5" ry="5" width="20" height="20" />
          <rect x="80" y="274" rx="5" ry="5" width="60%" height="16" />
          <rect x="0" y="322" rx="0" ry="0" width="100%" height="1" />
        </clipPath>
        <linearGradient id="fill-2">
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
  name: 'Skeleton2',
};
</script>
