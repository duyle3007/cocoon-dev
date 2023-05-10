import { useState } from 'react'
import { Button } from 'antd'
import Link from 'next/link'

import RangeDatePicker from '@/components/RangeDatePicker/RangeDatePicker'

import styles from './Calendar.module.scss'


const Calendar = () => {
    const [totalPrice, setTotalPrice] = useState("0.00")

    return (
            <div className={styles.calendar}>
                <h1>Calendar</h1>
                <div className={styles.mainView}>
                <div className={styles.calendarNote}>
                    <div className='flex gap-2 items-center'>
                        <div className='w-6 h-6 bg-white border-[#E8E8E8] border-[1px]'/>
                        <div className={styles.note}>AVAILABLE DATES</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='w-6 h-6 bg-[#E8E8E8]'/>
                        <div className={styles.note}>BOOKED DATES</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='w-6 h-6 bg-[#90744F]'/>
                        <div className={styles.note}>SELECTED DATES</div>
                    </div>
                </div>

                <div className={styles.chooseDate}>
                <RangeDatePicker />
                <div className={styles.priceTotal}>
                    <div className='flex justify-between px-4 py-2'>
                        <span>PRICE</span>
                        <span>TOTAL</span>
                    </div>
                    <div className='flex justify-between px-4 bg-[#F2EEE8] py-2'>
                        <span>Total</span>
                        <span>{totalPrice} AUD</span>
                    </div>
                </div>
                <Link href="/enquiry" className='flex flex-col'>
                <Button className={styles.enquiryButton}>GO TO  ENQUIRY FORM</Button>
                </Link>
                </div>
                </div>
            </div>
        )
}

export default Calendar