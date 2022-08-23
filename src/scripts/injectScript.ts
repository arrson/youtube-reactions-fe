(() => {
  // this id corresponds with id in Sidebar/index.tsx
  const SIDEBAR_ID = 'sidebar-extention-container';
  if (document.getElementById(SIDEBAR_ID) !== null) {
    return;
  }

  const container = document.createElement('div');
  container.id = SIDEBAR_ID;

  const reactJS_script = document.createElement('script');
  reactJS_script.src = 'sidebar.bundle.js';

  container.appendChild(reactJS_script);

  // inject into youtube sidebar
  const parentNode = document.querySelector(
    '#secondary > #secondary-inner > #related'
  );
  parentNode?.prepend(container);
})();
