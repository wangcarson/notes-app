import { NextPage } from 'next'
import Filter from './Filter';

interface Props {}

const TableFilters: NextPage<Props> = ({}) => {
    return (
        <div className="w-full flex justify-between items-center gap-4">
            <div className="flex gap-8 text-gray-600 text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-nowrap">
                        Filter by 
                    </div>
                    <Filter>
                        All boards
                    </Filter>
                    <Filter>
                        Owned by anyone
                    </Filter>
                </div>

                <div className="flex items-center gap-2">
                    <div className="text-nowrap">
                        Sort by 
                    </div>
                    <Filter>
                        Last opened
                    </Filter>
                </div>
            </div>

            <div className="min-w-16">
                End
            </div>
        </div>
    );
}

export default TableFilters;