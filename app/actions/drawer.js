export function setDrawer(drawer) {
  return {
    type: 'SET_DRAWER',
    drawer
  }
}

export function openDrawer() {
  return {
    type: 'OPEN_DRAWER'
  }
}