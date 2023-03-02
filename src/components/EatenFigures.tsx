import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface EatenFiguresProps {
    title: string;
    figures: Figure[];
}

const EatenFigures: FC<EatenFiguresProps> = ({title, figures}) => {
    return (
        <div className='eaten-figures-list'>
            <h3>Eaten figures: {title}</h3>
            {figures.map(figure => <div key={figure.id} className='eaten-figure'>
                {figure.name}
                {figure?.logo && <img width={20} height={20} src={figure.logo} alt='figure'/>}
            </div>)}
        </div>
    );
};

export default EatenFigures;