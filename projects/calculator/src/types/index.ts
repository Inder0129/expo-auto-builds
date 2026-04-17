export type CalculatorOperation = '+' | '-' | '×' | '÷';

export type ScientificFunction = 
  | 'sin' | 'cos' | 'tan' 
  | 'log' | 'ln' | '√' 
  | 'x²' | 'x³' | 'π' | 'e' | '(' | ')';

export type HistoryEntry = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

export type CalculatorState = {
  display: string;
  operation: string;
  previousValue: string;
  history: HistoryEntry[];
};