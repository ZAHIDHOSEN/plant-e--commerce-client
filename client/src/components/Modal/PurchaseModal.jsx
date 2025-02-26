/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Button from '../Shared/Button/Button'
import toast from 'react-hot-toast'

const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  // Total Price Calculation

  const {user} = useAuth()
  const {image,category,price,description,name,quantity,seller} = plant ||  {}
  const [total, setTotal] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const [parchesInfo, setParchesInfo] = useState({
    
  })
 
  

  const handleQuantity = value =>{
    if(value > quantity){
      setTotal(quantity)
      return toast('quantity extend available stock')
    }
    if(value < 0){
      setTotal(1)
      return toast('Quantity cannot less than 1')
    }
    setTotal(value)
  }

  const handlePay = async () =>{

  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ {price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                </div>
                {/* quantity */}

                <div className='space-x-2 flex items-center text-sm my-1'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  value={total}
                  onChange={(e)=>handleQuantity(parseInt(e.target.value))}
                  required

                />
              </div>

              {/* address */}
              <div className='space-x-2 flex items-center text-sm my-3'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Address
                </label>
                <input
                  className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='text'
                  placeholder='Available quantity'
                  required
                />
              </div>

              <Button onClick={handlePay} label={`${total * price}`}></Button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
