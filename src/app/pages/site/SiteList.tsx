import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export function MyPage() {
  return (
    <div className='row row-cols-1 row-cols-md-3 g-4'>
      <div className='col'>
        <div className='card'>
          <Card.Img variant='top' src='holder.js/100px180' />
          <div className='card-body'>
            <h5 className='card-title'>Museo del Ferrocarril</h5>
            <p className='card-text'>
              This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='card'>
          <Card.Img variant='top' src='holder.js/100px180' />
          <div className='card-body'>
            <h5 className='card-title'>Museo de Ciencia Natural</h5>
            <p className='card-text'>
              This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='card'>
          <Card.Img variant='top' src='holder.js/100px180' />
          <div className='card-body'>
            <h5 className='card-title'>Museo de Arte Moderno Carlos...</h5>
            <p className='card-text'>
              This is a longer card with supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='card'>
          <Card.Img variant='top' src='holder.js/100px180' />
          <div className='card-body'>
            <h5 className='card-title'>Chocomuseo</h5>
            <p className='card-text'>
              This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
