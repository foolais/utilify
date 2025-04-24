import { Button } from "./button";

interface iPropsAdminHeader {
  title: string;
  isWithButton?: boolean;
  btnText?: string;
}

const AdminHeader = ({
  title,
  isWithButton = true,
  btnText,
}: iPropsAdminHeader) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h1 className="text-2xl font-semibold tracking-wide">{title}</h1>
      {isWithButton && btnText ? <Button>{btnText}</Button> : null}
    </div>
  );
};

export default AdminHeader;
