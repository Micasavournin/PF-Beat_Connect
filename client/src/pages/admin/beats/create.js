import {
  SellerDashboardLayout,
  IslandDashboard,
  FormContainer,
  FormColumn,
  FormRow,
  Input,
  Select,
  SwitchForm,
} from "@/components";

import {
  handleSelectChange,
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";
import { ValidationCreateBeat } from "@/components/client/validationCreateBeat";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "@/redux/slices/filters";

export default function SellerDashboardOverview() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setErrors] = useState({});
  const genres = useSelector((state) => state.filters.genres);
  const validateMode = "beat";
  console.log("genres", genres);
  const [form, setForm] = useState({
    name: "",
    priceAmount: "",
    genre: selected,
    userCreator: "",
    bpm: "",
    image: {},
    audioMP3: {},
    _id: "",
    softDelete: false,
  });

  const handleInput = (e) => {
    handleInputChange(
      e,
      fieldsToValidate,
      setFieldsToValidate,
      form,
      setForm,
      validateMode
    );
  };

  const handleSelect = (e) => {
    handleSelectChange(e, setSelected, setForm, form);
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  const onSubmit = (e) => {
    console.log("onSubmit", e, validateMode);
    handleSubmit({
      form: form,
      //  dispatch: dispatch,
      //actionToDispatch: "user/create",
      setErrors: setErrors,
      validateMode: validateMode,
      formRef: formRef.current,
    });
  };

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: true,
          });
        },
      },
      {
        text: "No",
        active: !form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: false,
          });
        },
      },
    ],
  };

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Crear beat"
          topBarButtonLabel="Guardar cambios"
          onClick={onSubmit}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <form ref={formRef}>
              <FormContainer>
                <FormRow>
                  <FormColumn className="w-full">
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Nombre del beat"
                      label="Nombre"
                      error={error.name}
                      onChange={handleInput}
                    />
                    <Select
                      label={"Elige un genero"}
                      valores={genres}
                      setSeleccionados={handleSelect}
                      value={selected}
                      name="genre"
                      seleccionados={selected}
                      error={error.genre}
                      className="flex w-full flex-col gap-2"
                      labelClass="w-full text-sm-regular text-sm-medium"
                    />
                    <Input
                      id="audioMP3"
                      type="file"
                      name="audioMP3"
                      placeholder="Sube tu beat"
                      label="Beat"
                      onChange={handleInput}
                      error={error.audioMP3}
                    />
                    <SwitchForm
                      label="SoftDelete"
                      name="softDelete"
                      nameInput="softDelete"
                      defaultValue={false}
                      onChange={handleInput}
                      arrayButtons={arraySoftDelete.arrayButtons}
                    />
                  </FormColumn>
                  <FormColumn className="w-full">
                    <Input
                      id="priceAmount"
                      name="priceAmount"
                      type="number"
                      placeholder="Precio del beat"
                      label="Precio"
                      error={error.priceAmount}
                      onChange={handleInput}
                    />
                    <Input
                      id="bpm"
                      type="number"
                      name="bpm"
                      placeholder="BPMs"
                      label="BPMs"
                      error={error.bpm}
                      onChange={handleInput}
                    />
                    <Input
                      id="image"
                      name="image"
                      error={error.image}
                      type="file"
                      placeholder="Sube una portada"
                      label="Portada"
                      onChange={handleInput}
                    />
                  </FormColumn>
                </FormRow>
              </FormContainer>
            </form>
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
