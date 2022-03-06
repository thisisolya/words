import React from 'react'

interface WordListProps {
  allWords?: {
    ru: string,
    eng: string,
  }[]
}

const WordList = ({ allWords }: WordListProps) => {
  return (
    <div> card List</div>
  )
}

export default WordList
