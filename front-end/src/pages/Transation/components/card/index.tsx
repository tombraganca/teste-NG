import { CaretDoubleUp, CaretDoubleDown } from "phosphor-react";

interface ITransfer {
    title: string;
    description: string;
    value: number;
    type: 'sent' | 'received';
}

export function Card(props: ITransfer) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                {
                    props.type === 'sent' ? (
                        <CaretDoubleUp className="w-8 h-8 rounded-full" alt="Neil image" color="white" />
                    ) : (
                        <CaretDoubleDown className="w-8 h-8 rounded-full" alt="Neil image" color="white" />
                    )
                }
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                    {props.title}
                </p>
                <p className="text-sm text-gray-400 truncate">
                    {props.description}
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-white truncate">
                {'$ ' + props.type === 'sent' ? '-' : '+'} {props.value}
            </div>
        </div>
    )
}