import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { go, Lazy, map } from '../../utils/fx'

const createHTag = tag =>
  styled[tag](({ customStyle: { fontWeight, fontSize, margin } }) => ({
    fontWeight,
    fontSize,
    margin: margin || 0,
  }))

const HTags = [
  ...go(
    [...Lazy.range(6)],
    map(level => createHTag(`h${level + 1}`)),
  ),
]

const H = ({ children, customStyle = {}, level = 1 }) => {
  const Tag = HTags[level - 1]
  return <Tag customStyle={customStyle}>{children}</Tag>
}

H.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
}

export const defaultH1Style = {
  fontSize: '28px',
  fontWeight: 900,
}

export default H
