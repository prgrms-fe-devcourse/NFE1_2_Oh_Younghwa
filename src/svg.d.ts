// 루트에 svg.d.ts 파일 추가하고 안에 아래 코드 작성
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
