export function extractImageName(path) {
  const parts = path.split('/');
  const filename = parts.pop();
  const [name] = filename.split('.');

  return name;
}