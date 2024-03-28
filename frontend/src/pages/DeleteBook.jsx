import { useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='py-4'>
      <BackButton destination='/' />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl'>
          Are you sure? Do you want to delete this book?
        </h3>
        <button
          className='p-4 bg-red-500 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete It!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
