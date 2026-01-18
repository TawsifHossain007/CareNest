import React from 'react';
import ServiceCard from '../cards/ServiceCard';
import { getService } from '@/actions/server/Service';

const Service = async () => {
    const services = await getService()
    return (         
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>

    );
};

export default Service;