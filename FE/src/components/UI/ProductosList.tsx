import React from 'react'

const ProductosList = (props: any) => {
    const [showList, setShowList] = React.useState(false)
    return <>
       <div className='btn btn-secondary' onClick={() => setShowList(!showList)}>Productos</div><br/>
       {
           (
               showList ? props.productos.map((producto: any, index: number) => {
                   return <div key={`product-list-${index}`} className='w-100'>
                    <hr/>
                        - {producto.nombre}<br/>
                        {producto.addToCart} * ${producto.precio.toFixed(2)}<br/>
                        <b>${(producto.addToCart * producto.precio).toFixed(2)}</b>
                    </div>
               }) : ''
           )
       }
    </>
}

export default ProductosList
