export default function genAvataImg(name = 'user') {
  const avatarColors = ['#1C1C84', '#283258', '#1A6A8E', '#4AB1B5'];
  const initial = name.match(/\b\w/g);

  const displayName = `${initial[0]}${initial.length > 1 ? initial[initial.length - 1] : ''}`.toUpperCase();
  const backgroundColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return {
    displayName,
    backgroundColor
  }
}