import React, { useContext } from 'react'
import { FigmaContext } from '../../Room';

const LeftSidebar = () => {

  const {layersArr} = useContext(FigmaContext);

  return (
    <section className='flex flex-col w-80 border-t border-primary-grey-200 bg-black text-white min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20'>
      <h3 className='px-5 pt-4 text-xs uppercase mb-4'>LAYERS</h3>

      <div className='layers-list flex flex-col gap-4'>
      {
        layersArr.map((layer)=>{
          return <div key={layer.id} className='flex items-center gap-4 px-4'> {layer.icon} <p className='text-sm'>{layer.layer} {layer.count}</p></div>
        })
      }
      </div>

    </section>
  )
}

export default LeftSidebar
