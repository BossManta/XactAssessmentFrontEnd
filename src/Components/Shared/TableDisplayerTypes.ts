import { ReactNode } from "react"

//A type to standardize table custom elements.
//Uses a function to generate custom comonents.
export type CustomRowElementBuilder = (row: {}) => ReactNode