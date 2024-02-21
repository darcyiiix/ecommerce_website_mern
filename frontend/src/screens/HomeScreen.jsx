import React from 'react'
import { Row , Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {

  const { keyword, pageNumber } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({keyword, pageNumber});

  return (
    <>
      {!keyword ? (<ProductCarousel />) : (
        <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
      )}

      {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>{isError?.data?.message|| isError.isError}</Message>)
      
      : (<>    
          <h1>Latest Products</h1>
          <Row>
            { data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
              </Col>
            )) 
            } 
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
        </>)
      }
    </>
  )
}

export default HomeScreen;
