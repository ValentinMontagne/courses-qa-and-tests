import { vi, describe, it, expect, afterEach } from "vitest";
import { createUser } from "./user.service";
import * as userRepository from "./user.repository";

// Mock du module user.repository
vi.mock("./user.repository", async (importOriginal) => ({
  ...(await importOriginal()),
  createUserInRepository: vi.fn(),
}));

describe("User Service", () => {
  it("should create an user", async () => {
    // Arrange : Données de test ajustées pour passer la validation
    const userData = {
      name: "Valentin M",
      birthday: new Date("2024-04-03T15:53:47Z"), // Format Date ISO
    };
    const mockUser = {
      id: 1,
      name: "Valentin M",
      birthday: new Date("2024-04-03T15:53:47Z"),
    };

    // Configurer le mock pour retourner un utilisateur créé
    userRepository.createUserInRepository.mockResolvedValue(mockUser);

    // Act : Appeler la fonction à tester
    const result = await createUser(userData);

    // Assert : Vérifier que le mock a été appelé correctement
    expect(userRepository.createUserInRepository).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockUser);
  });

  // Réinitialiser les mocks après chaque test
  afterEach(() => {
    vi.clearAllMocks();
  });
});