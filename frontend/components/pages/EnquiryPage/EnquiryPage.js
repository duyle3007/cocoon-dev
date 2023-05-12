import { useRouter } from 'next/router';

import Image from '@/components/Image/Image'
import styles from './EnquiryPage.module.scss'

const EnquiryPage = () => {
    const router = useRouter();
    return (
        <div className={styles.enquiryPage}>
            <div className={styles.upperForm}>
            <div className={styles.backBtn} onClick={() => router.back()}>
                <Image src="/leftArrow.png" />
                BACK
            </div>
            <h1>MAKE AN INQUIRY</h1>
            </div>
        </div>
    )
}

export default EnquiryPage