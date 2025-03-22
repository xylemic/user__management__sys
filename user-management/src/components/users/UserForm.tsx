import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, NewUser, UpdateUser } from "../../types/user.types";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";

interface UserFormProps {
  initialData? : User;
  onSubmit: (userData: NewUser | UpdateUser) => Promise<void>;
  isLoading : boolean;
}

const UserForm : React.FC<UserFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name : initialData?.name || '',
    username : initialData?.username || '',
    email : initialData?.email || '',
    phone : initialData?.phone || '',
    website : initialData?.website || '',
    address : {
      street : initialData?.address?.street || '',
      suite : initialData?.address?.suite || '',
      city : initialData?.address?.city || '',
      zipcode : initialData?.address?.zipcode || '',
    },
    company : {
      name : initialData?.company?.name || '',
      catchPhrase : initialData?.company?.catchPhrase || '',
      bs : initialData?.company?.bs || '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // handle nested fields (address and company)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent] : {
          ...prev[parent as 'address' | 'company'],
          [child] : value,
        },
      }));
    } else {
      setFormData(prev => ({...prev, [name] : value }));
    }

    // clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name] : ''}));
    }
  };

  const validateForm = () : boolean => {
    const newErrors : Record<string, string> = {};

    // validate required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // validate address fields
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.zipcode.trim()) newErrors['address.zipcode'] = 'Zipcode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData : NewUser | UpdateUser = {
      ...formData,
      ...(isEditMode && { id : initialData.id }),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit User' : 'Add New User'}
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            error={errors.name}
          />

          <FormInput
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            required
            error={errors.username}
          />

          <FormInput
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            required
            error={errors.email}
          />

          <FormInput
            id="phone"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            error={errors.phone}
          />

          <FormInput
            id="website"
            name="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
            placeholder="johndoe.com"
            error={errors.website}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="address.street"
            name="address.street"
            label="Street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="123 Main St"
            required
            error={errors['address.street']}
          />

          <FormInput
            id="address.suite"
            name="address.suite"
            label="Suite"
            value={formData.address.suite}
            onChange={handleChange}
            placeholder="Apt. 4B"
            error={errors['address.suite']}
          />

          <FormInput
            id="address.city"
            name="address.city"
            label="City"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="New York"
            required
            error={errors['address.city']}
          />

          <FormInput
            id="address.zipcode"
            name="address.zipcode"
            label="Zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            placeholder="10001"
            required
            error={errors['address.zipcode']}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Company</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="company.name"
            name="company.name"
            label="Company Name"
            value={formData.company.name}
            onChange={handleChange}
            placeholder="Acme Inc"
            error={errors['company.name']}
          />

          <FormInput
            id="company.catchPhrase"
            name="company.catchPhrase"
            label="Catch Phrase"
            value={formData.company.catchPhrase}
            onChange={handleChange}
            placeholder="We are the best!"
            error={errors['company.catchPhrase']}
          />

          <div className="md:col-span-2">
            <FormInput
              id="company.bs"
              name="company.bs"
              label="Business"
              value={formData.company.bs}
              onChange={handleChange}
              placeholder="e-enable innovative applications"
              error={errors['company.bs']}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
          className=""
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className=""
        >
          {isLoading ? 'Saving...' : (isEditMode ? 'Update User' : 'Add User')}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;

