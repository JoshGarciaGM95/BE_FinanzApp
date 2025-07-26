const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createSubscription, getAllSubscriptions, getSubscriptionByUserId, updateSubscription } = require('../models/Subscription');

const createNewSubscription = async (req, res) => {
  const { user_id, plan_id } = req.body;

  try {
    const getSubscriptionsByUserId = await getSubscriptionByUserId(user_id);

    if(getSubscriptionsByUserId !== null){
      res.status(201).json({ message: 'Error la suscripción de este usuario ya existe!' });      
    }else{
      const newSubscription = await createSubscription(user_id, plan_id, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'active', 'credit_card');
      res.status(201).json(newSubscription);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la suscripción' });
  }
}

const getListSubscriptions = async (req, res) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las suscripciones' });
  }
}

const getSubscriptionByUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const subscriptions = await getSubscriptionByUserId(user_id);

    if (!subscriptions) {
      return res.status(200).json({ 
        sucsess: true,
        statusCode: 204,
        message: 'No se encontró ninguna suscripción para este usuario.' ,
        data: null
      });
    }

    if (subscriptions.end_date <= new Date()) subscriptions.status = 'inactive';

    res.json({
      sucsess: true,
      statusCode: 200,
      message: 'Suscripciones obtenidas correctamente',
      data: subscriptions
    });

} catch (err) {
    console.error(err);
    res.status(500).json({ 
      sucsess: false,
      statusCode: 500,
      message: 'Error al obtener las suscripciones del usuario',
      data: null
    });
}
}

const editSubscription = async (req, res) => {
  const { subscription_id, user_id, plan_id, start_date, end_date, status, payment_method } = req.body;

  try {
    const updatedSubscription = await updateSubscription(
      { user_id, plan_id, start_date, end_date, status, payment_method },
      { where: { subscription_id } }
    );
    res.json(updatedSubscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar la suscripción' });
  }
}

module.exports = {
  createNewSubscription,
  getListSubscriptions,
  getSubscriptionByUser,
  editSubscription
};