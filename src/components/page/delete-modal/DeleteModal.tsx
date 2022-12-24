import { FC, ReactElement } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/solid";

import Icon from "../../ui/icon/Icon";
import Modal from "../../ui/modal/Modal";
import Button from "../../ui/button/Button";

export type IModal = {
  open: boolean;
  id?: string | number;
  name: string | ReactElement;
};

type DeleteModalProps = {
  modal: IModal;
  isLoading: boolean;
  onClose: () => void;
  title: string | ReactElement;
  deleteClickHandler: () => void;
  description: string | ReactElement;
};

const DeleteModal: FC<DeleteModalProps> = ({
  modal,
  title,
  onClose,
  isLoading,
  description,
  deleteClickHandler,
}) => {
  return (
    <Modal open={modal.open} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-og-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <Icon className="h-5 w-5 text-og-red-600 fill-current">
            <ExclamationIcon aria-hidden="true" />
          </Icon>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-3 text-sm text-gray-600 space-y-5">
            {description}
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          type="button"
          isLoading={isLoading}
          onClick={deleteClickHandler}
          removeClass="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500"
          appendClass="w-full bg-og-red-600 hover:bg-og-red-700 focus:ring-og-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          OK
        </Button>
        <Button
          type="button"
          onClick={onClose}
          removeClass="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 text-white border-transparent"
          appendClass="mt-3 w-full bg-white hover:bg-gray-50 text-gray-700 focus:ring-brand-500 sm:mt-0 sm:w-auto sm:text-sm border-gray-300"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
