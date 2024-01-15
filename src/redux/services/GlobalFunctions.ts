import { ITable } from '../../components/ContentProject/ContentProject.interfaces';

interface Props {
  listInfo: ITable[];
  currentData: ITable;
  sendData: ITable;
}

export const UpdatedData = ({ listInfo, currentData, sendData }: Props) => {
  const arr = listInfo.reduce((result: any, item) => {
    return item.id !== currentData.id
      ? [...result, item]
      : [...result, { ...currentData, child: sendData.child }];
  }, []);

  return arr;
};
