

import HotelCard from '@/components/HotelCard/HotelCard'
import styles from './RelatedVilla.module.scss'

const RelatedVilla = ({info}) => {
    return (
            <div className={styles.relatedVilla}>
                <div className={styles.title}>
                    <h2>RELATED VILLAS</h2>
                    <h5>Similar villas you may like</h5>
                </div>
                <div className={styles.villaList}>
                    {info.relatedVilla.length > 0 && info.relatedVilla.map((villa, index) => <HotelCard key={index} item={villa} className={styles.hotel} />)}
                </div>
            </div>
    )
}

    export default RelatedVilla