import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../app/constans';
import { IServicesState } from '../../../interfaces';

interface IClientTiles {
  data: IServicesState["services"];
}

export const ClientTiles: FC<IClientTiles> = ({ data }) => {
  const navigate = useNavigate();
  const navigateToAddService = (id: string) => navigate(`${Endpoints.EDIT_SERVICES}/${id}`);

  return (<>
    {data && data.map((element) => (
      <div onClick={() => navigateToAddService("basic")} className="cursor-pointer border rounded-3 col-12 col-md-6 col-lg-4 p-4">
        <div>
          <img src="/images/basic.jpg" alt="Pakiet basic" width="250" />
        </div>
        <h4 className="mt-2">{element.service_address}</h4>
        <p>{element.service_unit_price * element.service_unit_price} PLN</p>
        <p>Status: {element.status}</p>
      </div>
    ))}
  </>)
}