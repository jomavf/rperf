import { useState, memo } from "react";

// Componente hijo que será memoizado
const ExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log("ExpensiveComponent renderizado");

  // Simulamos un cálculo costoso
  const calculateExpensiveValue = (num: number) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  const expensiveValue = calculateExpensiveValue(value);

  return (
    <div className="p-4 bg-white rounded shadow">
      <p>Valor calculado: {expensiveValue}</p>
    </div>
  );
});

const BadExpensiveComponent = ({ value }: { value: number }) => {
  console.log("Bad ExpensiveComponent renderizado");

  // Simulamos un cálculo costoso
  const calculateExpensiveValue = (num: number) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  const expensiveValue = calculateExpensiveValue(value);

  return (
    <div className="p-4 bg-white rounded shadow">
      <p>Valor calculado: {expensiveValue}</p>
    </div>
  );
};

const MemoPage = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  return (
    <div className="space-y-6">
      <div className="prose">
        <h1>React.memo - Memoización de Componentes</h1>

        <h2>¿Qué es?</h2>
        <p>
          React.memo es una higher-order component que permite memorizar un
          componente, evitando re-renderizados innecesarios cuando las props no
          han cambiado.
        </p>

        <h2>¿Cuándo usarlo?</h2>
        <ul>
          <li>Componentes que reciben las mismas props frecuentemente</li>
          <li>Componentes con cálculos costosos</li>
          <li>
            Componentes que se re-renderizan frecuentemente debido a cambios en
            el padre
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Ejemplo Práctico</h3>

        <div className="space-y-4">
          <ExpensiveComponent value={count} />
          <BadExpensiveComponent value={count} />
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setCount((c) => c + 1)}
            >
              Incrementar valor ({count})
            </button>

            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setUnrelatedState((s) => s + 1)}
            >
              Actualizar estado no relacionado ({unrelatedState})
            </button>
          </div>

          <div className="bg-yellow-100 p-4 rounded">
            <p className="text-sm">
              👉 Observa la consola del navegador. El componente
              ExpensiveComponent solo se re-renderiza cuando cambias el
              contador, no cuando actualizas el estado no relacionado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoPage;
