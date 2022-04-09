export default function sumArray(numbers: number[]):number {
  return numbers.reduce((acc: number, value:number):number => acc + value, 0)
}

