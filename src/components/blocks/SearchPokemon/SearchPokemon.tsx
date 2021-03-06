import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import { Input } from 'components/elements';
import { useDispatch } from 'react-redux';
import { Creators as PokemonActions } from 'store/modules/pokemons/actions';

const SearchPokemon: React.FC = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number | null>(null);

  const handleSubmitForm = useCallback(
    (value) => {
      if (value) {
        dispatch(PokemonActions.searchPoke(value));
        return;
      }
      dispatch(PokemonActions.getPokes(1));
    },
    [dispatch],
  );

  const getAllPokes = useCallback(
    (value) => {
      dispatch(PokemonActions.getPokes(value));
    },
    [dispatch],
  );

  const customHandleChange = useCallback(
    (event, change, submit) => {
      change(event);

      // debounce
      if (time) clearTimeout(time);
      setTime(setTimeout(() => submit(), 750));
    },
    [time],
  );

  return (
    <Formik
      initialValues={{ search: '' }}
      // validationSchema={Yup.object({
      //   search: Yup.string().required('requred field'),
      // })}
      onSubmit={(values) => {
        if (!values.search) {
          getAllPokes(1);
          return;
        }

        handleSubmitForm(values.search.toLowerCase());
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        submitForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            type="texto"
            name="procurar"
            placeholder="Que Pokémon você está procurando?"
            onChange={(e) => customHandleChange(e, handleChange, submitForm)}
            value={values.search}
            touched={touched.search}
            errors={errors.search}
          />
        </form>
      )}
    </Formik>
  );
};

export default SearchPokemon;
