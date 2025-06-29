/** Функция сериализации массива чисел от 1 до 300 */
const denseSerializeDigits = digits => String.fromCharCode(...digits.map(d => d))

/** Функция десериализации массива чисел от 1 до 300 */
const denseDeserializeDigits = denseString =>
  Array.from(denseString, char => char.charCodeAt(0))

/** Функция генерации массива случайных чисел от 1 до 300 */
const digitsArray = length =>
  Array.from({ length }, () => Math.floor(Math.random() * 300 + 1))

/** Функция генерации массива с одинаковыми значениями */
const fixedDigitsArray = (length, value) => Array.from({ length }, () => value)

/** Функция генерации массива из каждого числа по N раз (от 1 до 300) */
const repeatedDigitsArray = repeatsPerNumber =>
  Array.from({ length: 300 * repeatsPerNumber }, (_, i) => (i % 300) + 1)

/** Тест - Сравнение массивов поэлементно */
const isEqual = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i])

// массив случайных чисел от 1 до 300
const digits = digitsArray(999)
// Простая сериализация
const serializedDigits = JSON.stringify(digits)
// Компактная сериализация и десериализация
const denseSerializedDigits = denseSerializeDigits(digits)
const denseDeserializedDigits = denseDeserializeDigits(denseSerializedDigits)
// Вывод
console.log(
  `Тест 0 - массив из ${digits.length} случайных целых чисел:
    Длина строки: ${denseSerializedDigits.length}
    Длина сериализации JSON: ${serializedDigits.length}
    Коэффициент сжатия: ${(
      serializedDigits.length / denseSerializedDigits.length
    ).toFixed(2)}
    Успешно: ${isEqual(digits, denseDeserializedDigits) ? '✅' : '❌'}`
)

const runTest = (description, digits) => {
  const jsonSerialized = JSON.stringify(digits)
  const denseSerialized = denseSerializeDigits(digits)
  const deserialized = denseDeserializeDigits(denseSerialized)
  const ratio = (jsonSerialized.length / denseSerialized.length).toFixed(2)

  console.log(`\nТест: ${description}`)
  console.log(`Кол-во чисел: ${digits.length}`)
  console.log(`JSON размер: ${jsonSerialized.length} симв.`)
  console.log(`Dense размер: ${denseSerialized.length} симв.`)
  console.log(`Коэффициент сжатия: ${ratio}×`)
  console.log(`Восстановление корректно: ${isEqual(digits, deserialized) ? '✅' : '❌'}`)
}

runTest('1 число', [123])
runTest('5 чисел', [1, 2, 3, 4, 5])
runTest('10 чисел', [10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
runTest('Случайные 50 чисел', digitsArray(50))
runTest('Случайные 100 чисел', digitsArray(100))
runTest('Случайные 500 чисел', digitsArray(500))
runTest('Случайные 1000 чисел', digitsArray(1000))
runTest('Граница: все 1 (одноразрядные)', fixedDigitsArray(300, 1))
runTest('Граница: все 55 (двузначные)', fixedDigitsArray(300, 55))
runTest('Граница: все 123 (трёхзначные)', fixedDigitsArray(300, 123))
runTest('Каждого числа по 3 раза (всего 900 чисел)', repeatedDigitsArray(3))
