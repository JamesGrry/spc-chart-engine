export function writeOutputToConsole(option: any) {
  console.log(JSON.stringify(option, null, 2));
}

export async function writeOutputToFile(option: any, path: string) {
  const fs = await import('fs');
  fs.writeFileSync(path, JSON.stringify(option, null, 2));
}
