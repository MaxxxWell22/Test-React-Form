import { useForm, Controller } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';
import Select from 'react-select'
import styles from './App.module.scss';
import pictureLogo from "./asets/header-img.svg";

const App = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const options = [
    { value: 'О космосе', label: 'О космосе' },
    { value: 'О звёздах', label: 'О звёздах' },
    { value: 'О ракетах', label: 'О ракетах' }
  ]

  const onSubmit = data => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapperFirstName}>
            <div>
              <label className={styles.label}>Имя: </label>
              <input className={styles.input} type='text' name='firstName' {...register(('firstName'), { required: true })} />
            </div>
            <div>
              {errors.firstName && <span className={styles.error}><CiWarning style={{ fontSize: '20px' }} /> Это поле обязательно для заполнения</span>}
            </div>
          </div>

          <div className={styles.wrapperLastName}>
            <div>
              <label className={styles.label}>Фамилия: </label>
              <input className={styles.input} type='text' name='lastName' {...register(('lastName'), { required: true })} />
            </div>
            <div>
              {errors.lastName && <span className={styles.error}><CiWarning style={{ fontSize: '20px' }} /> Это поле обязательно для заполнения</span>}
            </div>
          </div>

          <div className={styles.wrapperEmail}>
            <div>
              <label className={styles.label}>Email: </label>
              <input className={styles.input} type='email' name='email' {...register(('email'), { required: true })} />
            </div>
            <div>
              {errors.email && <span className={styles.error}><CiWarning style={{ fontSize: '20px' }} /> Это поле обязательно для заполнения</span>}
            </div>
          </div>

          <div className={styles.wrapperCategory}>
            <label className={styles.labelCategory}>Выберите категорию вашего сообщения: </label>
            <Controller
              name="select"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    options={options}
                    isSearchable={false}
                    isClearable={true}
                    styles={{ control: (base) => ({ ...base, borderColor: errors.select ? 'red' : '#ccc' }) }}
                  />
                  {errors.select && <span className={styles.error}><CiWarning style={{ fontSize: '20px' }} /> Это поле обязательно для заполнения</span>}
                </div>
              )}
            />
          </div>

          <div className={styles.wrapperMessage}>
            <label className={styles.label}>Ваше сообщение: </label>
            <textarea className={styles.text} name='message' {...register(('message'), { required: true, minLength: 10 })} />
            {errors.message && <span className={styles.error}><CiWarning style={{ fontSize: '26px' }} /> Это поле должно содержать минимум 10 символов</span>}
          </div>

          <label className={styles.label}>Добавить картинку: </label>

          <input
            className={styles.picture}
            type="file"
            id="picture"
            name='file'
            {...register('file', {
              required: 'Вставьте картинку',
              validate: {
                fileType: (value) => {
                  const allowedTypes = ['image/jpeg', 'image/png'];
                  return value[0] && allowedTypes.includes(value[0].type) || 'Картина должна быть формата jpg или png';
                },
                fileSize: (value) => {
                  const maxSize = 2 * 1024 * 1024;
                  return value[0] && value[0].size <= maxSize || 'Максимальный размер 2МБ';
                }
              }
            })}
          />
          {errors.file && <span className={styles.errorMessage}><CiWarning style={{ fontSize: '20px' }} /> {errors.file.message}</span>}

          <div className={styles.wrapperSend}>
            <button className={styles.send} type="submit">Отправить</button>
          </div>
        </form>
      </div>

      <div className={styles.space}>
        <img className={styles.spaceImg} src={pictureLogo} alt="picture" />
      </div>

    </div >
  );
}

export default App;
