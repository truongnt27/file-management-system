export default function genAvataImg(name = 'user') {
  const avatarColors = ['#1C1C84', '#283258', '#1A6A8E', '#4AB1B5'];
  const displayName = name.charAt(0) + '2';
  const backgroundColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return {
    displayName,
    backgroundColor
  }
}